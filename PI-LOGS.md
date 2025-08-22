# Logs from Raspberry Pi

benbeau@raspberrypi:~/smart-mirror $ npm run dev

> smart-mirror@1.0.0 dev
> concurrently "cd server && npm run dev" "cd client-mirror && npm run electron-dev" "cd client-mobile && npm run dev"

[0] 
[0] > smart-mirror-server@1.0.0 dev
[0] > nodemon server.js
[0] 
[1] 
[1] > smart-mirror@0.1.0 electron-dev
[1] > concurrently "npm run dev" "wait-on http://localhost:3000 && electron ."
[1] 
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
[2]   VITE v5.4.19  ready in 310 ms
[2] 
[2]   ➜  Local:   http://localhost:3001/
[2]   ➜  Network: http://192.168.1.225:3001/
[1] [0] 
[1] [0] > smart-mirror@0.1.0 dev
[1] [0] > vite
[1] [0] 
[1] [0] 
[1] [0]   VITE v7.1.3  ready in 370 ms
[1] [0] 
[1] [0]   ➜  Local:   http://localhost:3000/
[1] [0]   ➜  Network: http://192.168.1.225:3000/
[0] 🚀 Smart Mirror Server running on port 5005
[0] 📊 Health check:  http://localhost:5005/api/health
[0] 🌍 Environment: production
[0] 🛜 WebRTC signaling service ready
[0] 
[0] 👤 Client Applications:
[0]    🪞 Mirror Interface: http://localhost:3000/
[0]    📱 Phone Interface:  http://localhost:3001/
[0] No stored tokens found
[1] [1] [5971:0822/124415.048485:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5971:0822/124415.048663:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5971:0822/124415.048751:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5971:0822/124415.048785:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5971:0822/124415.048842:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5971:0822/124415.048875:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5971:0822/124415.048929:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5971:0822/124415.048958:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5971:0822/124415.049009:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5971:0822/124415.049039:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5971:0822/124415.049090:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5971:0822/124415.049125:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5971:0822/124415.049177:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5971:0822/124415.049206:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5971:0822/124415.049254:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5971:0822/124415.049282:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5971:0822/124415.050812:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5971:0822/124415.050877:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5971:0822/124415.050935:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5971:0822/124415.050971:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5971:0822/124415.051019:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5971:0822/124415.051046:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5971:0822/124415.051092:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5971:0822/124415.051119:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5971:0822/124415.051164:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5971:0822/124415.051189:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5971:0822/124415.051233:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5971:0822/124415.051259:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5971:0822/124415.051310:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5971:0822/124415.051336:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [5971:0822/124415.051379:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [5971:0822/124415.051405:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[0] 127.0.0.1 - - [22/Aug/2025:16:44:16 +0000] "GET /api/auth/google/status HTTP/1.1" 200 41 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:16:44:16 +0000] "GET /api/auth/google/status HTTP/1.1" 200 41 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:16:44:16 +0000] "GET /api/weather HTTP/1.1" 200 622 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:16:44:16 +0000] "GET /api/weather HTTP/1.1" 200 622 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[1] [1] [5971:0822/124419.182187:ERROR:gl_surface_presentation_helper.cc(260)] GetVSyncParametersIfAvailable() failed for 1 times!
[1] [1] [5971:0822/124421.222268:ERROR:gl_surface_presentation_helper.cc(260)] GetVSyncParametersIfAvailable() failed for 2 times!
[1] [1] [5971:0822/124421.339840:ERROR:gl_surface_presentation_helper.cc(260)] GetVSyncParametersIfAvailable() failed for 3 times!
[0] 127.0.0.1 - - [22/Aug/2025:16:44:39 +0000] "POST /api/ai/test-image HTTP/1.1" 200 389 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:16:44:46 +0000] "POST /api/ai/analyze-image HTTP/1.1" 200 302 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
^C[2] cd client-mobile && npm run dev exited with code SIGINT
[1] [0] npm run dev exited with code SIGINT
[1] [1] /home/benbeau/smart-mirror/client-mirror/node_modules/electron/dist/electron exited with signal SIGINT
[1] [1] wait-on http://localhost:3000 && electron . exited with code SIGINT
[0] cd server && npm run dev exited with code SIGINT
[1] cd client-mirror && npm run electron-dev exited with code SIGINT
