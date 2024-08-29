import { getSiteListAction } from '@/actions/sites'

import CreateSite from './components/create-site'
import CreateSiteButton from './components/create-site-button'
import SiteList from './components/site-list'

const SitesPage = async () => {
  const data = await getSiteListAction()

  return (
    <>
      <div className="flex w-full justify-end">
        <CreateSiteButton />
      </div>
      {data === undefined || data.length === 0 ? (
        <CreateSite />
      ) : (
        <SiteList data={data} />
      )}
    </>
  )
}

export default SitesPage
