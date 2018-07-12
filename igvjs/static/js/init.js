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
                      url: '/download?file=tr_11.bw',
                      name: 'BigWig'
                  },
                  {
                      type: "annotation",
                      format: "bed",
                      url: '/download?file=tr_11.bed',
                      name: 'Bed'
                  },


              ]
  };

  browser = igv.createBrowser(div, options);
}
