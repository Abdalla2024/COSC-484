const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const fs = require('fs');

// Read credentials from json file
const credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));

// Get artists from command line arguments
const artists = process.argv.slice(2);

// if no artists specified
if (artists.length === 0) {
    console.log('You did not specify an artist(s)');
    process.exit(0);
}

// Function to scrape the website
async function scrapeWebsite() {
    try {
        const response = await axios.get('https://www.popvortex.com/music/charts/top-rap-songs.php', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Connection': 'keep-alive',
            }
        });
        const $ = cheerio.load(response.data);
        const songs = [];

        // Scrape the top 25 songs using the title-artist class
        $('.title-artist').slice(0, 25).each((i, element) => {
            const titleElement = $(element).find('.title');
            const artistElement = $(element).find('.artist');
            
            if (titleElement.length && artistElement.length) {
                const title = titleElement.text().trim();
                const artist = artistElement.text().trim();
                songs.push({ artist, title });
            }
        });

        console.log('Total songs found:', songs.length);
        return songs;
    } catch (error) {
        console.error('Error scraping website:', error);
        return [];
    }
}

// Function to filter songs by artists
function filterSongsByArtists(songs, artists) {
    const filteredSongs = [];
    const foundArtists = new Set();

    console.log('Searching for artists:', artists);
    console.log('Total songs to filter:', songs.length);

    songs.forEach(song => {
        const lowerArtist = song.artist.toLowerCase();
        artists.forEach(artist => {
            const lowerSearchArtist = artist.toLowerCase();
            if (lowerArtist === lowerSearchArtist || 
                lowerArtist.includes(lowerSearchArtist) || 
                lowerSearchArtist.includes(lowerArtist)) {
                const songInfo = `${song.artist}: ${song.title}`;
                console.log('Found matching song:', songInfo);
                filteredSongs.push(songInfo);
                foundArtists.add(artist);
            }
        });
    });

    console.log('Total filtered songs:', filteredSongs.length);
    return {
        songs: filteredSongs,
        foundArtists: Array.from(foundArtists)
    };
}

// Function to send email
async function sendEmail(songs, foundArtists) {
    if (songs.length === 0) {
        console.log('No songs found for specified artist(s)');
        return;
    }

    // Format subject
    let subjectArtists = foundArtists.join(', ');
    if (foundArtists.length > 1) {
        const lastArtist = foundArtists.pop();
        subjectArtists = foundArtists.join(', ') + ', and ' + lastArtist;
    }

    // Format email body
    let emailBody = '';
    songs.forEach(song => {
        const parts = song.split(':');
        const artist = parts[0].trim();
        const songName = parts[1] ? parts[1].trim() : '';
        emailBody += `<b>${artist}</b>: <i>${songName}</i><br>`;
    });

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: credentials.senderEmail,
            pass: credentials.senderPassword
        }
    });

    // Email options
    const mailOptions = {
        from: credentials.from,
        to: credentials.to,
        subject: `Your artist(s) are: ${subjectArtists}`,
        html: emailBody
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Main function
async function main() {
    const songs = await scrapeWebsite();
    const { songs: filteredSongs, foundArtists } = filterSongsByArtists(songs, artists);
    await sendEmail(filteredSongs, foundArtists);
}

main();
