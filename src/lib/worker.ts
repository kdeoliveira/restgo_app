export default () => {
    //Listener on worker that will be waiting
    self.addEventListener('message', e => { 
        if (!e) return;

        
        let connection = false

        let cancel = setInterval(() => {
            if(connection) {
                clearInterval(cancel)
                return
            }

            fetch("http://127.0.0.1:8000", {
                credentials: "include"
            }).then(
                async (x) => {
                    try{
                        const data = await x.json()
    
                        if(data){
                            postMessage(false)
                            connection = true
                            return;
                        }
                        postMessage(true)
    
                    }catch(_e){
                        postMessage(true)
                    }
                    
                }
            ).catch(
                (x) => {
                    postMessage(true)
                }
            )
        },
        2000);
    })


}
