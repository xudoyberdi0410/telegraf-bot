const axios = require('axios');
require('dotenv').config()

async function get_link_to_video(v_url){
    const options = {
      method: 'GET',
      url: 'https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index',
      params: {
        url: v_url
      },
      headers: {
        'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
        'X-RapidAPI-Host': 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        if (response.data){
            return response.data.video[0];
        } else {
            return false
        }
    } catch (error) {
        console.error(error);
        return 'error'
    }
}

module.exports.get_link_to_video = get_link_to_video
// get_link_to_video('https://vt.tiktok.com/ZS8EuK8tt/')