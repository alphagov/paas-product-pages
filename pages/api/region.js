import siteConfig from '../../config/config.json'

export default (req, res) => {

  // const selectedRegion = context.query.region
  // const selectedRegionData = siteConfig.adminLoginUrls.filter(function(region){
  //   return region.location === selectedRegion
  // })

  
  if (req.method === 'POST') {
    const selectedRegion = req.body.region
    const selectedRegionData = siteConfig.adminLoginUrls.filter(function(region){
      return region.location === selectedRegion
    })

    res.writeHead(301, {
      Location: selectedRegionData[0].url
    })
    res.end()
    return {}
  } else {
    // Handle any other HTTP method
  }
}