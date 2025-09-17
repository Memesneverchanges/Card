
export function Popup(props: { visible: boolean, children: React.ReactNode,width?:string|number, height?:string|number,backgroundImage?:string,scroll?:boolean, header?:string ,headerSize?:string|number }) {
  return (
    <>
      <div className="overlay" style={{ visibility: props.visible ? 'visible' : 'hidden',position:'fixed',width:'100%',height:'100%',zIndex:19}}>
        <div className="popup"style={{width:props.width,height:props.height}} >
          {props.header?<div className="popup-header" style={{fontSize:props.headerSize}}>{props.header}</div>:''}
          <div className="popup-body" style={{width:props.width,height:props.height, backgroundImage:props.backgroundImage, overflowX:props.scroll?'scroll':'unset'}}>
          {props.children}
          </div>
        </div>
      </div>
    </>
  )
}