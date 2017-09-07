function initBrowser() {
  var div, options, browser;

  div = $("#myDiv")[0];
  options = {
      reference: {
          id: "hg19",
          fastaURL: "https://s3.amazonaws.com/igv.broadinstitute.org/genomes/seq/1kg_v37/human_g1k_v37_decoy.fasta",
          cytobandURL: "https://s3.amazonaws.com/igv.broadinstitute.org/genomes/seq/b37/b37_cytoband.txt"
      },
      tracks: [
          {
              name: "Genes",
              searchable: false,
              type: "annotation",
              format: "gtf",
              sourceType: "file",
              url: "https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/gencode.v18.annotation.sorted.gtf.gz",
              indexURL: "https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/gencode.v18.annotation.sorted.gtf.gz.tbi",
              visibilityWindow: 10000000,
              order: Number.MAX_VALUE,
              displayMode: "EXPANDED"
          }

      ]
    };

    browser = igv.createBrowser(div, options);
    igv.setupFlaskBrowser();
}

function testCors() {
  igv.browser.loadTrack({
      url: 'http://snorlax.ucsd.edu:8659/static/data/hipstr_genomewide/chr1/hipstr_calls_1_24.vcf.gz',
      indexed: true,
      indexURL: 'http://snorlax.ucsd.edu:8659/static/data/hipstr_genomewide/chr1/hipstr_calls_1_24.vcf.gz.tbi',
      name: 'test_cors',
      visibilityWindow: 100000, // 100 k
      height: 500,
      oauth: 'google'
  });
}
