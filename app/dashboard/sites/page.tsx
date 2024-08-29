import { getSiteListAction } from '@/actions/sites'

import CreateSiteButton from './components/create-site-button'
import SiteEmpty from './components/site-empty'
import SiteList from './components/site-list'

const SitesPage = async () => {
  const data = await getSiteListAction()

  return (
    <>
      <div className="flex w-full justify-end">
        <CreateSiteButton />
      </div>
      {data === undefined || data.length === 0 ? (
        <SiteEmpty />
      ) : (
        <SiteList data={data} />
      )}
    </>
  )
}

export default SitesPage
