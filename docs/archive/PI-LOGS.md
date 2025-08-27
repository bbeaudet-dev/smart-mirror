# Logs from Raspberry Pi

benbeau@raspberrypi:~/smart-mirror $ npm run dev

> smart-mirror@1.0.0 dev
> concurrently "cd server && npm run dev" "cd client-mirror && npm run electron-dev"

[0] 
[0] > smart-mirror-server@1.0.0 dev
[0] > nodemon server.js
[0] 
[1] 
[1] > smart-mirror@0.1.0 electron-dev
[1] > concurrently "npm run dev" "wait-on http://localhost:3000 && electron ."
[1] 
[0] [nodemon] 3.1.10
[0] [nodemon] to restart at any time, enter `rs`
[0] [nodemon] watching path(s): *.*
[0] [nodemon] watching extensions: js,mjs,cjs,json
[0] [nodemon] starting `node server.js`
[0] node:internal/modules/cjs/loader:1368
[0]   throw err;
[0]   ^
[0] 
[0] Error: Cannot find module 'roboflow'
[0] Require stack:
[0] - /home/benbeau/smart-mirror/server/services/roboflowService.js
[0] - /home/benbeau/smart-mirror/server/routes/ai.js
[0] - /home/benbeau/smart-mirror/server/server.js
[0]     at Function._resolveFilename (node:internal/modules/cjs/loader:1365:15)
[0]     at defaultResolveImpl (node:internal/modules/cjs/loader:1021:19)
[0]     at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1026:22)
[0]     at Function._load (node:internal/modules/cjs/loader:1175:37)
[0]     at TracingChannel.traceSync (node:diagnostics_channel:322:14)
[0]     at wrapModuleLoad (node:internal/modules/cjs/loader:235:24)
[0]     at Module.require (node:internal/modules/cjs/loader:1445:12)
[0]     at require (node:internal/modules/helpers:135:16)
[0]     at Object.<anonymous> (/home/benbeau/smart-mirror/server/services/roboflowService.js:1:26)
[0]     at Module._compile (node:internal/modules/cjs/loader:1688:14) {
[0]   code: 'MODULE_NOT_FOUND',
[0]   requireStack: [
[0]     '/home/benbeau/smart-mirror/server/services/roboflowService.js',
[0]     '/home/benbeau/smart-mirror/server/routes/ai.js',
[0]     '/home/benbeau/smart-mirror/server/server.js'
[0]   ]
[0] }
[0] 
[0] Node.js v22.18.0
[0] [nodemon] app crashed - waiting for file changes before starting...
[1] [0] 
[1] [0] > smart-mirror@0.1.0 dev
[1] [0] > vite
[1] [0] 
[1] [0] 
[1] [0]   VITE v7.1.3  ready in 233 ms
[1] [0] 
[1] [0]   ➜  Local:   http://localhost:3000/
[1] [0]   ➜  Network: http://192.168.1.39:3000/
[1] [1] [8416:0825/120051.100020:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [8416:0825/120051.100362:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [8416:0825/120051.106851:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [8416:0825/120051.107002:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [8416:0825/120051.107139:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [8416:0825/120051.107651:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [8416:0825/120051.107818:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [8416:0825/120051.107890:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [8416:0825/120051.108014:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [8416:0825/120051.108077:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [8416:0825/120051.108204:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [8416:0825/120051.108472:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [8416:0825/120051.108716:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [8416:0825/120051.108779:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [8416:0825/120051.108910:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [8416:0825/120051.108973:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [8416:0825/120051.111867:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [8416:0825/120051.112146:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [8416:0825/120051.112593:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [8416:0825/120051.112704:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [8416:0825/120051.113271:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [8416:0825/120051.113350:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [8416:0825/120051.113505:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [8416:0825/120051.113581:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [8416:0825/120051.113699:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [8416:0825/120051.113792:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [8416:0825/120051.113903:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [8416:0825/120051.113954:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [8416:0825/120051.114058:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [8416:0825/120051.114159:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [8416:0825/120051.114263:ERROR:gbm_wrapper.cc(75)] Failed to get fd for plane.: No such file or directory (2)
[1] [1] [8416:0825/120051.114314:ERROR:gbm_wrapper.cc(258)] Failed to export buffer to dma_buf: No such file or directory (2)
[1] [1] [8416:0825/120057.170977:ERROR:gl_surface_presentation_helper.cc(260)] GetVSyncParametersIfAvailable() failed for 1 times!
[1] [1] [8416:0825/120057.176564:ERROR:gl_surface_presentation_helper.cc(260)] GetVSyncParametersIfAvailable() failed for 2 times!
[1] [1] [8416:0825/120059.156955:ERROR:gl_surface_presentation_helper.cc(260)] GetVSyncParametersIfAvailable() failed for 3 times!
[1] [1] Warning: Insufficient Vulkan limits for maxTextureDimension1D. VkPhysicalDeviceLimits::maxImageDimension1D must be at least 8192
[1] [1]  - While gathering supported limits for "V3D 7.1.7.0" - "V3DV Mesa: Mesa 24.2.8-1~bpo12+rpt3" (vendorId=0x14e4 deviceId=0x55701c33 backend=BackendType::Vulkan type=AdapterType::IntegratedGPU)
[1] [1]     at InitializeSupportedLimitsImpl (../../third_party/dawn/src/dawn/native/vulkan/PhysicalDeviceVk.cpp:396)
[1] [1]     at Initialize (../../third_party/dawn/src/dawn/native/PhysicalDevice.cpp:61)
[1] [1] 
[1] [1] Warning: eglChooseConfig returned zero configs
[1] [1]     at Create (../../third_party/dawn/src/dawn/native/opengl/ContextEGL.cpp:65)
[1] [1]     at Create (../../third_party/dawn/src/dawn/native/opengl/PhysicalDeviceGL.cpp:110)
[1] [1] 

