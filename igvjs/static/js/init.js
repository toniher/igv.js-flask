function initBrowser() {
  var div,
          options,
          browser;

  div = $("#myDiv")[0];
  options = {
      reference: {
          id: "virtual",
          fastaURL: "/static/data/public/chr1.fa",
          indexURL: "/static/data/public/chr1.fa.fai"
      },
          locus: "chr1:1-1857976",
      tracks:
              [
                  {
                      type: "wig",
                      format: "bigWig",
                      url: '/download/tr_11.bw',
                      name: 'BigWig',
                      displayMode: "COLLAPSED"
                  },
                  {
                      type: "wig",
                      format: "bigWig",
                      url: 'static/data/public/tr_11.bw',
                      name: 'BigWig-static',
                      displayMode: "COLLAPSED"
                  },
                  {
                      type: "wig",
                      format: "bedGraph",
                      url: '/download/tr_11.bedGraph',
                      name: 'BedGraph',
                      displayMode: "COLLAPSED"
                  },
                  {
                      type: "wig",
                      format: "bigWig",
                      url: 'static/data/public/bigWigExample.bw',
                      name: 'BigWig from UCSC',
                  }


              ]
  };

  browser = igv.createBrowser(div, options);
}
