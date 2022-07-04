export default function webWorker(worker : any) {
		
		const blob = new Blob(['('+worker+')()']);
        //Generates worker from a file
		return new Worker(URL.createObjectURL(blob));
}
