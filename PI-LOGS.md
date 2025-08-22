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
[2]   VITE v5.4.19  ready in 324 ms
[2] 
[2]   ➜  Local:   http://localhost:3001/
[2]   ➜  Network: http://192.168.1.225:3001/
[1] [0] 
[1] [0] > smart-mirror@0.1.0 dev
[1] [0] > vite
[1] [0] 
[1] [0] 
[1] [0]   VITE v7.1.3  ready in 389 ms
[1] [0] 
[1] [0]   ➜  Local:   http://localhost:3000/
[1] [0]   ➜  Network: http://192.168.1.225:3000/
[1] [1] App threw an error during load
[1] [1] ReferenceError: require is not defined in ES module scope, you can use import instead
[1] [1] This file is being treated as an ES module because it has a '.js' file extension and '/home/benbeau/smart-mirror/client-mirror/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
[1] [1]     at file:///home/benbeau/smart-mirror/client-mirror/public/electron.js:1:46
[1] [1]     at ModuleJob.run (node:internal/modules/esm/module_job:194:25)
[1] [1] A JavaScript error occurred in the main process
[1] [1] Uncaught Exception:
[1] [1] ReferenceError: require is not defined in ES module scope, you can use import instead
[1] [1] This file is being treated as an ES module because it has a '.js' file extension and '/home/benbeau/smart-mirror/client-mirror/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
[1] [1]     at file:///home/benbeau/smart-mirror/client-mirror/public/electron.js:1:46
[1] [1]     at ModuleJob.run (node:internal/modules/esm/module_job:194:25)
[0] 🚀 Smart Mirror Server running on port 5005
[0] 📊 Health check:  http://localhost:5005/api/health
[0] 🌍 Environment: production
[0] 🛜 WebRTC signaling service ready
[0] 
[0] 👤 Client Applications:
[0]    🪞 Mirror Interface: http://localhost:3000/
[0]    📱 Phone Interface:  http://localhost:3001/
[0] No stored tokens found
[1] [1] [3454:0822/112532.977852:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [3454:0822/112532.978019:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [3454:0822/112532.978626:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [3454:0822/112532.978676:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [3454:0822/112532.978747:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [3454:0822/112532.978788:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [3454:0822/112532.978850:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [3454:0822/112532.978892:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [3454:0822/112532.979011:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [3454:0822/112532.979075:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [3454:0822/112532.979149:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [3454:0822/112532.979192:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [3454:0822/112532.979256:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [3454:0822/112532.979305:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [3454:0822/112532.979369:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [3454:0822/112532.979409:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [3454:0822/112532.981223:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [3454:0822/112532.981308:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [3454:0822/112532.982440:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [3454:0822/112532.982600:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [3454:0822/112532.982716:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [3454:0822/112532.982760:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [3454:0822/112532.982821:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [3454:0822/112532.982867:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [3454:0822/112532.982925:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [3454:0822/112532.982963:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [3454:0822/112532.983028:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [3454:0822/112532.983067:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [3454:0822/112532.983125:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [3454:0822/112532.983164:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [3454:0822/112532.983226:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [3454:0822/112532.983265:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[0] 127.0.0.1 - - [22/Aug/2025:15:25:39 +0000] "GET /api/auth/google/status HTTP/1.1" 200 41 "http://localhost:3000/" "Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:15:25:39 +0000] "GET /api/auth/google/status HTTP/1.1" 304 - "http://localhost:3000/" "Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:15:25:39 +0000] "GET /api/auth/google/status HTTP/1.1" 200 41 "http://localhost:3000/" "Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:15:25:40 +0000] "GET /api/weather HTTP/1.1" 200 622 "http://localhost:3000/" "Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:15:25:40 +0000] "GET /api/weather HTTP/1.1" 200 622 "http://localhost:3000/" "Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:15:25:40 +0000] "GET /api/weather HTTP/1.1" 200 622 "http://localhost:3000/" "Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
[0] 127.0.0.1 - - [22/Aug/2025:15:26:50 +0000] "POST /api/ai/test-image HTTP/1.1" 200 123 "http://localhost:3000/" "Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
[1] [1] Warning: Insufficient Vulkan limits for maxTextureDimension1D. VkPhysicalDeviceLimits::maxImageDimension1D must be at least 8192
[1] [1]  - While gathering supported limits for "V3D 7.1.7.0" - "V3DV Mesa: Mesa 24.2.8-1~bpo12+rpt3" (vendorId=0x14e4 deviceId=0x55701c33 backend=BackendType::Vulkan type=AdapterType::IntegratedGPU)
[1] [1]     at InitializeSupportedLimitsImpl (../../third_party/dawn/src/dawn/native/vulkan/PhysicalDeviceVk.cpp:396)
[1] [1]     at Initialize (../../third_party/dawn/src/dawn/native/PhysicalDevice.cpp:61)
[1] [1] 
[1] [1] Warning: eglChooseConfig returned zero configs
[1] [1]     at Create (../../third_party/dawn/src/dawn/native/opengl/ContextEGL.cpp:65)
[1] [1]     at Create (../../third_party/dawn/src/dawn/native/opengl/PhysicalDeviceGL.cpp:110)
[1] [1] 


