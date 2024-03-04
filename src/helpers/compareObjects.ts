export default function compareObjects(source:any, target:any){
    const diffObj = {} as {
        [key:string]:string|number
    };
    Object.keys(source).forEach((key)=>{
        if (source[key] !== target[key])
            diffObj[key] = target[key]
    })
    return diffObj;
}
