1. Sitewide
   - [ ] Bundle analyzer remove unused code
   - [ ] Focus select disable for mobile
   - [ ] Ignore public readme images
   - [ ] PWA \_redirects precache error
2. Item Picker
   - [ ] Ouput to comma, pipe
   - [ ] Upload add json, csv options
3. Aspect ratio

   - [ ] Add suggested dimensions

     ```js
     function suggestNearestIntegerDimensions(originalWidth, originalHeight, target) {
       const aspectRatio = originalHeight / originalWidth;

       if ("width" in target) {
         const baseWidth = target.width;
         const lower = findNearestFromWidth(baseWidth, aspectRatio, "down");
         const higher = findNearestFromWidth(baseWidth, aspectRatio, "up");
         return { lower, higher };
       }

       if ("height" in target) {
         const baseHeight = target.height;
         const lower = findNearestFromHeight(baseHeight, aspectRatio, "down");
         const higher = findNearestFromHeight(baseHeight, aspectRatio, "up");
         return { lower, higher };
       }

       throw new Error("Target must include either width or height");
     }

     function findNearestFromWidth(baseWidth, aspectRatio, direction) {
       let width = baseWidth;
       const step = direction === "up" ? 1 : -1;

       while (width > 0) {
         const height = width * aspectRatio;
         if (Number.isInteger(height)) {
           return { width, height: Math.round(height) };
         }
         width += step;
       }
     }

     function findNearestFromHeight(baseHeight, aspectRatio, direction) {
       let height = baseHeight;
       const step = direction === "up" ? 1 : -1;

       while (height > 0) {
         const width = height / aspectRatio;
         if (Number.isInteger(width)) {
           return { width: Math.round(width), height };
         }
         height += step;
       }
     }

     // Original dimensions
     const originalWidth = 1920;
     const originalHeight = 1080;

     // Suggest dimensions from a new width
     console.log(suggestNearestIntegerDimensions(originalWidth, originalHeight, { width: 1000 }));

     // Suggest dimensions from a new height
     console.log(suggestNearestIntegerDimensions(originalWidth, originalHeight, { height: 600 }));
     ```

4. New tools
   - [ ] Image resizer using sharpjs. Take a photo and generate hero, thumb, etc.: https://sharp.pixelplumbing.com
   - [ ] Dummy HTML generator, i.e.: https://www.htmlstrip.com/lorem-ipsum-generator but use ipsum alternative like https://www.dummytextgenerator.com
   - [ ] Compare text, i.e.: https://www.diffchecker.com
   - [ ] Random keygen, i.e.: https://randomkeygen.com
