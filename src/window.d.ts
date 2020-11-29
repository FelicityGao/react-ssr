interface Window {
  __INITIAL_DATA__: any; //注意这里如果不写any那么用window.jim是可以的，但是用window.jim.hu 就会报错
}