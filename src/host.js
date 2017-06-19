'use strict';
export default function() {
  var urlObj = {
    dev: {
      api: '',
      toLoginUrl:''
    },
    test: {
      api: 'http://test1.com/',
      toLoginUrl:''
    },
    release: {
      api: '',
      toLoginUrl:''
    }
  };
  var environment = 'test';
  return urlObj[environment];
}
