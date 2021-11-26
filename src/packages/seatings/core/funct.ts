import { SeatsInterface, dataPrecomposion } from "./type"

export function getComposition(precompostion?: dataPrecomposion[]): SeatsInterface[] {
    // 
    let data: SeatsInterface[] = [];
    precompostion?.map(item => {
        data = [...data, ...item.data]
    })
    return data
}

export function getDecomposition(data: SeatsInterface[], y = 0): dataPrecomposion[] {
    let precompData: dataPrecomposion[] = [];
    for (let i = 0; i < y; i++) {
        precompData.push({
            id: i,
            data: data.filter(item => (item.y === i)).sort((a, b) => a.x - b.x)
        })
    }

    return precompData
}

export function getComp(data: SeatsInterface[], property : keyof SeatsInterface = "y"){
    return data.reduce((acc, value)=>{
        const key = value["y"];
        return {
            ...acc,
            [key] : key in acc ? acc[key].concat(value).sort((a:any, b:any) => a.x - b.x) 
            : [value]
        }
    },{} as any)
}