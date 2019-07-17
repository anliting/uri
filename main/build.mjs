import rollup from'rollup'
import fs from'fs'
let fsp=fs.promises
async function link(input,file){
    let bundle=await rollup.rollup({
        input,
    })
    return(await bundle.generate({
        format:'es',
    })).output[0].code
}
;(async()=>{
    fsp.copyFile('license','dist/node/license')
    fsp.copyFile('main/uri.mjs','dist/node/uri.mjs')
    fsp.writeFile('dist/node/package.json',JSON.stringify({
        name:'@anliting/uri',
        version:'1.0.0',
        main:'uri.mjs',
    }))
    let[license,code]=await Promise.all([
        fsp.readFile('license','utf8'),
        link('main/uri.mjs'),
    ])
    fsp.writeFile(`dist/uri.mjs`,`/*${license}*/${code}`)
})()
