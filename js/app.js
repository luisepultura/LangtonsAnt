'use strict';
let view = require('./view');
//let window = window || {};
// let LangtonView = window.LangtonView || {};
// LangtonView.view = view;
// window.LangtonView = LangtonView;
//view(4).play();

if (typeof window !== 'undefined') {
    let LangtonView = window.LangtonView || {};
    LangtonView.view = view;
    window.LangtonView = LangtonView;
}