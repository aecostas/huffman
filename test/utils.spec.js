import chai from 'chai';
import utils from '../src/utils.js';

let list;

describe('Utils', function () {
  before(function () {
    list = [
      {
        value: 1,
        p: 0.5
      },
      {
        value: 2,
        p: 0.3
      },
      {
        value: 3,
        p: 0.2
      }
    ];
  });

  it('Inserting sorted at the beginning', () => {
    let testList = Array.from(list);

    utils.insertSorted(testList, {value: '10', p: 0.7 });
    chai.expect(testList[0].p).to.deep.equal(0.7);
  });

  it('Inserting sorted at the beginning - bottom overlapped', () => {
    let testList = Array.from(list);

    utils.insertSorted(testList, {value: '10', p: 0.5 });
    chai.expect(testList[0].p).to.deep.equal(0.5);
  });

  it('Inserting sorted in the  middle - top overlapped', () => {
    let testList = Array.from(list);

    utils.insertSorted(testList, {value: '10', p: 0.2 });
    chai.expect(testList[2].p).to.deep.equal(0.2);
  });

  it('Inserting sorted in the middle', () => {
    let testList = Array.from(list);

    utils.insertSorted(testList, {value: '10', p: 0.3 });
    chai.expect(testList[1].p).to.deep.equal(0.3);
  });

  it('Inserting sorted in the middle - overlapped', () => {
    let testList = Array.from(list);

    utils.insertSorted(testList, {value: '10', p: 0.4 });
    chai.expect(testList[1].p).to.deep.equal(0.4);
  });

  it('Inserting sorted at the end', () => {
    let testList = Array.from(list);

    utils.insertSorted(testList, {value: '10', p: 0.1 });
    chai.expect(testList[3].p).to.deep.equal(0.1);
  });

});
