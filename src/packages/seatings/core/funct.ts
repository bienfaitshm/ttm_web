import { SeatsInterface, dataPrecomposion, CabineConfigurationInterface } from "./type"

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