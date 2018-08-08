function initBrowser() {
  var div,
          options,
          browser;

  div = $("#myDiv")[0];
  options = {
      reference: {
          id: "hg19",
          fastaURL: "https://s3.amazonaws.com/igv.broadinstitute.org/genomes/seq/1kg_v37/human_g1k_v37_decoy.fasta",
          cytobandURL: "https://s3.amazonaws.com/igv.broadinstitute.org/genomes/seq/b37/b37_cytoband.txt"
      },
      locus: "chr21:33,031,597-33,041,570",
      tracks:
              [
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
