/*global it, describe*/
let expect = require('chai').expect;
let refiner = require('../js/refiner.js');
let data = require('./Alfred_Hitchcock.js');

describe('testing Refiner:', () => {
    it('should find 14 movies', () => {
        expect (refiner (data.test_movie).results.length === 14);
    });
    it('should find 4 tv shows', () => {
        expect (refiner (data.test_tv).results.length === 4);
    });
    it('should find 1 person', () => {
        expect (refiner (data.test_person).results.length === 1);
    });
    it('should find 1 company', () => {
        expect (refiner (data.test_company).results.length === 14);
    });
    it('should return object with two keys: {media_type, results}', () => {
        expect ( typeof(refiner (data.test_movie)) === 'object' &&
            Object.keys(refiner (data.test_movie)).length === 2 &&
            Object.keys(refiner (data.test_movie)).sort()[0] === 'media_type' &&
            Object.keys(refiner (data.test_movie)).sort()[1] === 'results');
    });
    it('media_type should be String', () => {
        expect ( typeof(refiner (data.test_movie).media_type === 'string'));
    });
    it('results should be Array', () => {
        expect ( typeof(refiner (data.test_movie).media_type === 'array'));
    });
});
