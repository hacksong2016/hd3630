// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
    id: 'com.fami2u.ygl',
    name: 'ygl',
    description: 'ygl',
    author: 'fami2u',
    email: 'sunhannan@fami2u.com',
    website: 'http://fami2u.com'
});

// App.icons({
//     "iphone": 'icons/ios/Icon-40.png',
//     "iphone_2x": 'icons/ios/Icon-40@2x.png',
//     "iphone_3x": 'icons/ios/Icon-40@3x.png',
//     "ipad": 'icons/ios/Icon-60@2x.png',
//     "ipad_2x": 'icons/ios/Icon-60@3x.png',
//     "android_ldpi": 'icons/android/mdpi/ic_launcher_APP.png',
//     "android_mdpi": 'icons/android/mdpi/ic_launcher_APP.png',
//     "android_hdpi": 'icons/android/hdpi/ic_launcher_APP.png',
//     "android_xhdpi": 'icons/android/xhdpi/ic_launcher_APP.png'
// });

// App.launchScreens({
//     "iphone": 'splash/ios/iPhone 4@2x.png',
//     "iphone_2x": 'splash/ios/iPhone 4@2x.png',
//     "iphone5": 'splash/ios/iPhone 5@2x.png',
//     "iphone6": 'splash/ios/iPhone 6@2x.png',
//     "iphone6p_portrait": 'splash/ios/iPhone 6p@3x.png',
//     "android_ldpi_portrait": 'splash/android/hdpi.png',
//     "android_mdpi_portrait": 'splash/android/xhdpi.png',
//     "android_hdpi_portrait": 'splash/android/xxhdpi.png',
//     "android_xhdpi_portrait": 'splash/android/xxxhdpi.png',
// });

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);

App.setPreference("DisallowOverscroll", true);

// App.setPreference("DisallowOverscroll", true);

App.setPreference("StatusBarOverlaysWebView", true);
App.setPreference("StatusBarBackgroundColor", "#000000");
App.setPreference("StatusBarStyle", "lightcontent");


App.configurePlugin('nl.xservices.plugins.LaunchMyApp', {
    URL_SCHEME: 'ygl'
});

App.configurePlugin('wang.imchao.plugin.alipay', {
    'PARTNER_ID': '2088901797041767',
    'SELLER_ACCOUNT': 'xiangcunlvyouw@qq.com',
    'PRIVATE_KEY': 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAM9pxjIvS7m5gA5wz59vozSuhi5PnPEoXSm7Mq4mKq7wgli9cCI9WXQZn7e5O6gukzWd8fhc7KsoN+0oHo/HSkG5/qG25qXzsiZNkXXKixj3DZpg+9tizDcwfzhYyPH/pK1NNa+QLufo74kg6zsloPjLaDxuMoRK2zBj2wYHnGytAgMBAAECgYBWsN8mGp6MAfyEDKK7AO42Frv+n0f5g+Vsi9Gi+FDezaetb4BuzzWUUSFwqPtGUDE3N8zrAevpneXCOgKMFb/y+Cnv/kaDoUnI9Rmu4dl95/y/dXNkneGtfpoDw7MWEF0alOdbWEcVlPhtrmTBtx1mzNz7wqTBke0ZoLfJHOMAAQJBAOeRdCIGiIjda2WOWaPg+yweU1i4I9yiIHnyllDZL2B8OCh/hK5W7g6hWvJDdc0s3zLjDeOP4zF571tagwjcv60CQQDlS+fSklcQY0net2jA521UjgL5byMGtCaPmcULA0H9yFr0189fIR4TmFLnTjMkIBUDjOB9LCj2QIxEwB7qAAEBAkEA4dVettg8S4308SP0k/gTvKEOk5Vxk/ihR4ynv80vgR9j/UrvcL7ih24hLedQeXpraks4/lcTMOtD3YnWBMyUOQJAJaOuLEzFafVCfQLSeUgEFGszZcqujz0nT09InyQrwwMOmz6J1e3TyBerFDkr//QcPvbzKtkC6Fl0LRz0dikGAQJAauFHNeLyUGgMOePH3zWGH7qYIZS7vjP6OKE0kJuqKCKwll7+ObDTxR0le2gS+Q2wFvXXxJg5cWpCcCyEbp7A7A=='
});

App.configurePlugin('wechat.fami2u.com', {
    WECHATAPPID: 'wx24b870b73f9c45ee'
});

App.configurePlugin('cn.jpush.phonegap.JPushPlugin', {
    API_KEY: '572b5ceb34778878be13b61b'
});

App.accessRule('http://*');
App.accessRule('https://*');

