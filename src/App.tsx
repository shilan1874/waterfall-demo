import * as React from 'react';
import './style.less';
import { listArr } from './helper.js';

const GAP = 20;
const WIDTH = 200 + GAP;
// 默认两列
const COLUMN = 2;
const COLUMN_ONE = 0;
console.log(listArr);

export default function App() {
  function init() {
    const box = document.getElementById('box');
    const boxItem = box.children;
    console.log(boxItem);

    let minItemInfo = [];
    for (let i = 0; i < boxItem.length; i++) {
      console.log(boxItem[i].children[0]);
      if (i < COLUMN) {
        const translateWidth = i * WIDTH;
        boxItem[i].style.transform = `translate(${translateWidth}px, 0px)`;
        minItemInfo.push({
          translateWidth,
          height: boxItem[i].offsetHeight,
        });
      } else {
        const [column1, column2] = minItemInfo;
        const minIndex = column1.height <= column2.height ? 0 : 1;
        const { translateWidth, height } = minItemInfo[minIndex];
        const translateHeight = GAP + height;
        const transform = `translate(${translateWidth}px, ${translateHeight}px)`;
        boxItem[i].style.transform = transform;
        const currentHeight = translateHeight + boxItem[i].offsetHeight;
        minItemInfo[minIndex].height = currentHeight;
        minItemInfo[minIndex].translateWidth = translateWidth;
      }
    }
  }

  React.useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <div className="main">
        <div className="list" id="box">
          {listArr.map((item, index) => (
            <div className="item" key={index}>
              <img src={item.img} style={{ height: `${item.height}` }} />
              <div className="content">{item.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
