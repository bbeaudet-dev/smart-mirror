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
[2]   VITE v5.4.19  ready in 314 ms
[2] 
[2]   ➜  Local:   http://localhost:3001/
[2]   ➜  Network: http://192.168.1.225:3001/
[1] [0] 
[1] [0] > smart-mirror@0.1.0 dev
[1] [0] > vite
[1] [0] 
[1] [0] 
[1] [0]   VITE v7.1.3  ready in 393 ms
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
[1] [1] [4640:0822/121602.443957:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [4640:0822/121602.444182:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [4640:0822/121602.444677:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [4640:0822/121602.445622:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [4640:0822/121602.446111:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [4640:0822/121602.446183:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [4640:0822/121602.446279:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [4640:0822/121602.446319:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [4640:0822/121602.446408:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [4640:0822/121602.446456:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [4640:0822/121602.446529:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [4640:0822/121602.447642:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [4640:0822/121602.450711:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [4640:0822/121602.450828:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [4640:0822/121602.450940:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [4640:0822/121602.450998:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [4640:0822/121602.453875:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [4640:0822/121602.454246:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [4640:0822/121602.454423:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [4640:0822/121602.454577:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [4640:0822/121602.455100:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [4640:0822/121602.455208:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [4640:0822/121602.455406:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [4640:0822/121602.455856:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [4640:0822/121602.456029:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [4640:0822/121602.456286:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [4640:0822/121602.456927:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [4640:0822/121602.457339:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [4640:0822/121602.457493:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [4640:0822/121602.457545:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [4640:0822/121602.457622:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [4640:0822/121602.457672:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[0] 127.0.0.1 - - [22/Aug/2025:16:16:03 +0000] "GET /api/auth/google/status HTTP/1.1" 200 41 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:16:16:03 +0000] "GET /api/auth/google/status HTTP/1.1" 200 41 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:16:16:03 +0000] "GET /api/weather HTTP/1.1" 200 622 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:16:16:04 +0000] "GET /api/weather HTTP/1.1" 200 622 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[1] [1] [4640:0822/121606.611771:ERROR:gl_surface_presentation_helper.cc(260)] GetVSyncParametersIfAvailable() failed for 1 times!
[1] [1] [4640:0822/121606.615190:ERROR:gl_surface_presentation_helper.cc(260)] GetVSyncParametersIfAvailable() failed for 2 times!
[1] [1] [4640:0822/121609.019980:ERROR:gl_surface_presentation_helper.cc(260)] GetVSyncParametersIfAvailable() failed for 3 times!
[0] 127.0.0.1 - - [22/Aug/2025:16:16:19 +0000] "POST /api/ai/test-image HTTP/1.1" 200 343 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:16:16:30 +0000] "POST /api/ai/analyze-image HTTP/1.1" 200 279 "http://localhost:3000/" "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) smart-mirror/0.1.0 Chrome/120.0.6099.291 Electron/28.3.3 Safari/537.36"
[1] [1] Warning: Insufficient Vulkan limits for maxTextureDimension1D. VkPhysicalDeviceLimits::maxImageDimension1D must be at least 8192
[1] [1]  - While gathering supported limits for "V3D 7.1.7.0" - "V3DV Mesa: Mesa 24.2.8-1~bpo12+rpt3" (vendorId=0x14e4 deviceId=0x55701c33 backend=BackendType::Vulkan type=AdapterType::IntegratedGPU)
[1] [1]     at InitializeSupportedLimitsImpl (../../third_party/dawn/src/dawn/native/vulkan/PhysicalDeviceVk.cpp:396)
[1] [1]     at Initialize (../../third_party/dawn/src/dawn/native/PhysicalDevice.cpp:61)
[1] [1] 
[1] [1] Warning: eglChooseConfig returned zero configs
[1] [1]     at Create (../../third_party/dawn/src/dawn/native/opengl/ContextEGL.cpp:65)
[1] [1]     at Create (../../third_party/dawn/src/dawn/native/opengl/PhysicalDeviceGL.cpp:110)
[1] [1] 
^C[1] [1] /home/benbeau/smart-mirror/client-mirror/node_modules/electron/dist/electron exited with signal SIGINT
[2] cd client-mobile && npm run dev exited with code SIGINT
[1] [0] npm run dev exited with code SIGINT
[0] cd server && npm run dev exited with code SIGINT
[1] [1] wait-on http://localhost:3000 && electron . exited with code SIGINT
[1] cd client-mirror && npm run electron-dev exited with code SIGINT

benbeau@raspberrypi:~/smart-mirror $ 

