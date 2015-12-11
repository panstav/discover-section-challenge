![Getting Schwifty](http://i.imgur.com/NcVGxBY.gif)

# Installation

1.  Travel to a local directory where it'd be fit to clone this repo

		cd ~/Dev/scratch
		git clone https://github.com/panstav/discover-section-challenge.git

2.  CD to new directory, install package dependencies and hold tight

		cd discover-section-challenge
		npm install

3.  Run build

		npm run build
	
	**Notice:** It is at this stage that books.json image urls are being uniquefied, so that different images would so for every book. To disable this behaviour, you may run the following line:
	
		CLONE_IMAGES=true npm run build
	
4.  Run main file

		node .
		
	**Optionally:** Run server from any other port using the following line:
	
		PORT=12345 node .