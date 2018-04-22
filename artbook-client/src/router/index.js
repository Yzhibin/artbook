import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import AuthorityDisplay from '@/components/authority/AllArtworksDisplay'
import AllLost from '@/components/authority/AllLostArtwork'
import PoliceLost from '@/components/police/AllLostArtwork'
import AuthorityLanding from '@/components/authority/AuthorityLanding'
import PoliceLanding from '@/components/police/PoliceLanding'
import PoliceDisplay from '@/components/police/PoliceArtworksDisplay'
import ArtworkDetails from '@/components/ArtworkDetails'
import MyArtworks from '@/components/individual/MyArtworks'
import ConsignedArtworks from '@/components/agency/ConsignedArtworks'
import AddArtwork from '@/components/authority/AddNewArtwork'
import AuthLogin from '@/components/auth/AuthLogin'
import AuthorityRecent from '@/components/authority/AuthorityRecentArtwork'
import MockPaymentPage from '@/components/individual/MockPaymentPage'
import ConsentHistory from '@/components/authority/ConsentHistory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home Page',
      component: Home
    },
    {
      path: '/authorityConsole',
      name: 'Authority Console',
      component: AuthorityDisplay
    },
    {
      path: '/authority',
      name: 'Authority Landing',
      component: AuthorityLanding
    },
    {
      path: '/police',
      name: 'Police Landing',
      component: PoliceLanding
    },
    {
      path: '/policeConsole',
      name: 'Police Console',
      component: PoliceDisplay
    },
    {
      path: '/artwork/:id',
      component: ArtworkDetails
    },
    {
      path: '/my',
      component: MyArtworks
    },
    {
      path: '/agency',
      component: ConsignedArtworks
    },
    {
      path: '/addArtwork',
      component: AddArtwork
    },
    {
      path: '/auth',
      component: AuthLogin
    },
    {
      path: '/authorityRecent',
      component: AuthorityRecent
    },
    {
      path: '/payment/:paymentId/:price/:token',
      component: MockPaymentPage
    },
    {
      path: '/missing',
      component: AllLost
    },
    {
      path: '/policemissing',
      component: PoliceLost
    },
    {
      path: '/consentHistory',
      component: ConsentHistory
    }
  ]
})
