/**
 * Created by Administrator on 2017/01/05 0005.
 */
import App from '../container/App'

import Home from '../container/home'

import ActivityBox from '../container/activity/index'
import ActivityInfo from '../container/activity/activityInfo'

import CourseBox from '../container/course'
import Select from '../container/course/select'
import Two4Class from '../container/course/two4Class'
import SelectDetail from '../container/course/selectDetail'

import MyInfo from '../container/myInfo'
import MyCourse from '../container/myInfo/myCourse'
import MyGift from '../container/myInfo/myGift'
import MyGiftDetail from '../container/myInfo/myGiftDetail'
import BankCard from '../container/bankCard'
import MyAddress from '../container/myInfo/address'
import MyOrder from '../container/order'
import MyCollection from '../container/myInfo/collection'

import GoodDetail from '../container/good'
import goodOrder from '../container/good/goodOrder'
import CommentList from '../container/comment/commentList'
import Login from '../container/login'

import CardItem from '../container/interests'
import CardInterests from '../container/interests/cardDetail'
import AuthorityDetail from '../container/interests/authorityDetail'
import InterestsInfo from '../container/interests/interestsInfo'


export const routeConfig = [
    {
        path: '/',
        component: App,
        indexRoute: { component: Home },
        childRoutes: [
            { path: 'activity', component: ActivityBox },
            {
                path: 'course',
                component: CourseBox ,
                indexRoute: { component: Select },
                childRoutes: [
                    { path: 'two4Class', component: Two4Class }
                ]
            },
            {path: 'cardItem', component: CardItem},
            {path: 'cardInterests', component:AuthorityDetail },
            {path:'interestsInfo',component:InterestsInfo},
            { path: 'myInfo', component: MyInfo },
            { path: 'myCourse', component: MyCourse },
            { path: 'myBankCard', component: BankCard },
            { path: 'myGift', component: MyGift },
            { path: 'myGiftDetail',component:MyGiftDetail},
            { path: 'myAddress', component: MyAddress },
            { path: 'myOrder', component: MyOrder },
            { path: 'myCollection', component: MyCollection },


            { path: 'comment', component: CommentList },
            { path: 'activity/:activityId', component: ActivityInfo },
            { path: 'course/:selectId', component: SelectDetail },
            { path: 'good/:goodId', component: GoodDetail },
            {path:'goodOrder', component:goodOrder},

            { path: 'login', component: Login }
        ]
    }
];