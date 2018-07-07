'use_strict';

const PureArray = require('../src/PureArray');

const expect = require('chai').expect;

describe('PureArray', () => {
  describe('isEmpty', () => {
    it('returns true for empty array', () => {
      expect(PureArray.isEmpty([])).to.eql(true);
    });
    it('returns false for length=1', () => {
      expect(PureArray.isEmpty(['hiya!'])).to.eql(false);
    });
    it('returns false for length=2', () => {
      expect(PureArray.isEmpty([1, 2])).to.eql(false);
    });
  });

  describe('length', () => {
    it('returns 0 for empty array', () => {
      expect(PureArray.length([])).to.eql(0);
    });
    it('returns 1 for single array', () => {
      expect(PureArray.length([1])).to.eql(1);
    });
    it('returns 2 for list array', () => {
      expect(PureArray.length([1, 2])).to.eql(2);
    });
    it('returns 8 for large array', () => {
      expect(PureArray.length([1, 5, null, 1, undefined, 'oh a string', 1, false])).to.eql(8);
    });
  });

  describe('map', () => {
    it('returns empty array for empty array', () => {
      expect(PureArray.map([], (value) => value * 2)).to.eql([]);
    });
    it('calls the passed in function for each item in the original array and returns a new array', () => {
      expect(PureArray.map([1, 2, 3], (value) => value * 2)).to.eql([2, 4, 6]);
    });
    // More tests needed here
  });

  describe('filter', () => {
    it('returns empty array for empty array', () => {
      expect(PureArray.filter([], (value) => value < 2)).to.eql([]);
    });
    it('returns a new array containing only the values from the original array that pass the condition set by the passed in function', () => {
      expect(PureArray.filter([3, 1, 2, 4], (value) => value < 2)).to.eql([1]);
    });
    // More tests needed here
  });

  describe('sort', () => {
    it('returns empty array for empty array', () => {
      expect(PureArray.sort([], (a, b) => a - b)).to.eql([]);
    });
    it('returns a new array that is a sorted version of the original', () => {
      expect(PureArray.sort([3, 1, 2, 4], (a, b) => a - b)).to.eql([1, 2, 3, 4]);
      expect(PureArray.sort([3, 1, 2, 4], (a, b) => b - a)).to.eql([4, 3, 2, 1]);
    });
  });
});
