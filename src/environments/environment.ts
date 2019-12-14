// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 // modelUrl : 'http://localhost:4200/model', // http://compiletime.it/apps/card_print/model-new/repo.php?page='
 // pdfUrl : 'https://compiletime.it/apps/card_print/pdf/TCPDF-master/examples/image_v2.php?cards='

 //modelUrl : 'https://fir-dcac6.firebaseapp.com/model',
 modelUrl : 'https://compiletime.it/apps/card_print/model-new/CORS/index_cors.php',
 pdfUrl : 'https://compiletime.it/apps/card_print/pdf/TCPDF-master/examples/image_v2.php?cards='
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
