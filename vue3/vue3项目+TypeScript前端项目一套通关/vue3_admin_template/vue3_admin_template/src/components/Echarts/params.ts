
export const color =  (type:string|undefined) => {
    const getLinkColor = (color1 = '#7B89FF',color2 = '#4261F6',type = 'linear') => {
        return {
            type,
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: color1 // 0% 处的颜色
            }, {
                offset: 1, color: color2 // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
    }
    if(type){
        return [getLinkColor('#7B89FF','#4261F6'), 
                getLinkColor('#FFAF47','#FB8C2D'), 
                getLinkColor('#46D190','#24C35A'),
                getLinkColor('#47A3FF','#168AFE'),
                getLinkColor('#B79DFF','#A07DFF'),
                getLinkColor('#6A8BF3','#7998FF'),
                getLinkColor('#7B89FF','#4261F6')]
    }else{
        return ['#7B89FF', '#FFAF47', '#46D190', '#47A3FF', '#B79DFF', '#6A8BF3', '#7B89FF',"#529b2e","#b88230","#f89898","#73767a","#f8e3c5","#79bbff","#c45656","#d9ecff"]
    }
}
export const fontColor = "#0B0F5A"
