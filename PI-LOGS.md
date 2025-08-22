# Logs from Raspberry Pi

benbeau@raspberrypi:~/smart-mirror $ npm run dev

> smart-mirror@1.0.0 dev
> concurrently "cd server && npm run dev" "cd client-mirror && npm run electron-dev" "cd client-mobile && npm run dev"

[1] 
[1] > smart-mirror@0.1.0 electron-dev
[1] > concurrently "npm run dev" "wait-on http://localhost:3000 && electron ."
[1] 
[0] 
[0] > smart-mirror-server@1.0.0 dev
[0] > nodemon server.js
[0] 
[2] 
[2] > smart-mirror-mobile@0.1.0 dev
[2] > vite
[2] 
[0] [nodemon] 3.1.10
[0] [nodemon] to restart at any time, enter `rs`
[0] [nodemon] watching path(s): *.*
[0] [nodemon] watching extensions: js,mjs,cjs,json
[0] [nodemon] starting `node server.js`
[2] 
[2]   VITE v5.4.19  ready in 316 ms
[2] 
[2]   ➜  Local:   http://localhost:3001/
[2]   ➜  Network: http://192.168.1.225:3001/
[1] [0] 
[1] [0] > smart-mirror@0.1.0 dev
[1] [0] > vite
[1] [0] 
[1] [0] 
[1] [0]   VITE v7.1.3  ready in 336 ms
[1] [0] 
[1] [0]   ➜  Local:   http://localhost:3000/
[1] [0]   ➜  Network: http://192.168.1.225:3000/
[1] [1] [5289:0822/122433.021790:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5289:0822/122433.023295:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5289:0822/122433.028783:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5289:0822/122433.031178:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5289:0822/122433.032235:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5289:0822/122433.032365:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5289:0822/122433.032945:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5289:0822/122433.033041:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5289:0822/122433.033200:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5289:0822/122433.033644:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5289:0822/122433.033808:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5289:0822/122433.033965:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5289:0822/122433.034243:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5289:0822/122433.034334:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5289:0822/122433.034726:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5289:0822/122433.034817:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5289:0822/122433.037378:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5289:0822/122433.038105:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5289:0822/122433.038289:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5289:0822/122433.038381:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5289:0822/122433.039180:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5289:0822/122433.039305:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5289:0822/122433.039484:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5289:0822/122433.039564:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5289:0822/122433.040503:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5289:0822/122433.040611:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5289:0822/122433.040763:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5289:0822/122433.040851:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5289:0822/122433.040992:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5289:0822/122433.041742:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5289:0822/122433.041942:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5289:0822/122433.042589:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[0] 🚀 Smart Mirror Server running on port 5005
[0] 📊 Health check:  http://localhost:5005/api/health
[0] 🌍 Environment: production
[0] 🛜 WebRTC signaling service ready
[0] 
[0] 👤 Client Applications:
[0]    🪞 Mirror Interface: http://localhost:3000/
[0]    📱 Phone Interface:  http://localhost:3001/
[0] No stored tokens found
[0] 127.0.0.1 - - [22/Aug/2025:16:24:34 +0000] "GET /api/auth/google/status HTTP/1.1" 200 41 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:16:24:34 +0000] "GET /api/auth/google/status HTTP/1.1" 200 41 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:16:24:34 +0000] "GET /api/weather HTTP/1.1" 200 622 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[1] [1] [5289:0822/122434.960797:ERROR:gl_surface_presentation_helper.cc(260)] GetVSyncParametersIfAvailable() failed for 1 times!
[1] [1] [5289:0822/122434.995714:ERROR:gl_surface_presentation_helper.cc(260)] GetVSyncParametersIfAvailable() failed for 2 times!
[0] 127.0.0.1 - - [22/Aug/2025:16:24:35 +0000] "GET /api/weather HTTP/1.1" 200 622 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:16:24:53 +0000] "POST /api/ai/test-image HTTP/1.1" 200 140 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[1] [1] [5289:0822/122453.328658:ERROR:gl_surface_presentation_helper.cc(260)] GetVSyncParametersIfAvailable() failed for 3 times!
[0] 127.0.0.1 - - [22/Aug/2025:16:24:58 +0000] "POST /api/ai/analyze-image HTTP/1.1" 200 261 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[0] Weather data retrieved for outfit analysis: {
[0]   current: {
[0]     temperature: 76,
[0]     condition: 'Sunny',
[0]     icon: '☀️',
[0]     humidity: 33,
[0]     windSpeed: 7,
[0]     feelsLike: 76,
[0]     uvIndex: 7.9,
[0]     visibility: 9,
[0]     pressure: 1018,
[0]     windDirection: 'NNE',
[0]     gustSpeed: 8,
[0]     cloudCover: 0,
[0]     dewPoint: 49
[0]   },
[0]   forecast: [
[0]     {
[0]       day: 'Today',
[0]       high: 87,
[0]       low: 59,
[0]       condition: 'Sunny',
[0]       icon: '☀️',
[0]       chanceOfRain: 0
[0]     },
[0]     {
[0]       day: 'Tomorrow',
[0]       high: 88,
[0]       low: 68,
[0]       condition: 'Sunny',
[0]       icon: '☀️',
[0]       chanceOfRain: 0
[0]     },
[0]     {
[0]       day: 'Saturday',
[0]       high: 80,
[0]       low: 71,
[0]       condition: 'Partly Cloudy ',
[0]       icon: '⛅',
[0]       chanceOfRain: 0
[0]     }
[0]   ],
[0]   location: 'New York',
[0]   lastUpdated: '2025-08-22T16:25:00.927Z'
[0] }
[0] 127.0.0.1 - - [22/Aug/2025:16:25:07 +0000] "POST /api/ai/analyze-outfit-with-weather HTTP/1.1" 200 854 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:16:25:09 +0000] "GET /api/auth/google HTTP/1.1" 200 360 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:16:25:10 +0000] "GET /api/auth/google HTTP/1.1" 200 360 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
^C[1] [0] npm run dev exited with code SIGINT
[1] [1] /home/benbeau/smart-mirror/client-mirror/node_modules/electron/dist/electron exited with signal SIGINT
[0] cd server && npm run dev exited with code SIGINT
[2] cd client-mobile && npm run dev exited with code SIGINT
[1] [1] wait-on http://localhost:3000 && electron . exited with code SIGINT
[1] cd client-mirror && npm run electron-dev exited with code SIGINT

benbeau@raspberrypi:~/smart-mirror $ 

