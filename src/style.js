function minimizeData( _content ) {
    var content = _content;
    content = content.replace( /\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '' );
    // now all comments, newlines and tabs have been removed
    content = content.replace( / {2,}/g, ' ' );
    // now there are no more than single adjacent spaces left
    // now unnecessary: content = content.replace( /(\s)+\./g, ' .' );
    content = content.replace( / ([{:}]) /g, '$1' );
    content = content.replace( /([;,]) /g, '$1' );
    content = content.replace( / !/g, '!' );
    return content;
}
const css = `
.powerade tr {
  border: none;
}
.powerade tr td.border-top {
  border-top-color: #928087;
  border-top-style: solid;
  border-top-width: 4px;
}
.powerade tr td.axis-top {
  border-top-color: #9e1e4c;
  border-top-style: solid;
  border-top-width: 2px;
}
.powerade tr td.border-right {
  border-right-color: #928087;
  border-right-style: solid;
  border-right-width: 4px;
}
.powerade tr td.axis-right {
  border-right-color: #9e1e4c;
  border-right-style: solid;
  border-right-width: 2px;
}
.powerade tr td.border-bottom {
  border-bottom-color: #928087;
  border-bottom-style: solid;
  border-bottom-width: 4px;
}
.powerade tr td.axis-bottom {
  border-bottom-color: #9e1e4c;
  border-bottom-style: solid;
  border-bottom-width: 2px;
}
.powerade tr td.border-left {
  border-left-color: #928087;
  border-left-style: solid;
  border-left-width: 4px;
}
.powerade tr td.axis-left {
  border-left-color: #9e1e4c;
  border-left-style: solid;
  border-left-width: 2px;
}
.powerade tr td[class*=extra] {
  border-color: #ce8ea5;
  background-color: #ececec;
}
.powerade tr th.y-label {
  text-align: center;
}
.powerade .z-gradient-0 {
  background-color: #cf3027;
  color: white;
}
.powerade .z-gradient-1 {
  background-color: #f58220;
  color: white;
}
.powerade .z-gradient-2 {
  background-color: #feda00;
  color: white;
}
.powerade .z-gradient-3 {
  background-color: #90c73e;
  color: white;
}
.powerade .z-gradient-4 {
  background-color: #11a249;
  color: white;
}
.powerade .z-gradient-unknown {
  background-color: gray;
  color: white;
}
.powerade .item {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  margin: 1px 1px;
  height: 32px;
  font-size: 13px;
  border-radius: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.powerade .item img {
  border-radius: 8px;
  float: left;
  height: 32px;
  width: 32px;
}
.powerade .item span {
  padding-left: 5px;
  padding-right: 5px;
}
.powerade [data-drop-target] {
  text-align: center;
  background-color: #f1f1f1;
  border: dashed 1px #9e1e4c;
  border-radius: 2px;
  margin: 10px auto 30px;
  padding: 1px;
  height: 150px;
  width: 150px;
  transition: background-color 0.3s;
}
.powerade [draggable] {
  transition: background-color 0.3s;
}
.powerade .drag-enter {
  background-color: #9e1e4c;
  border-color: #9e1e4c;
  border-style: solid;
}
`;
export const style = minimizeData(css)
