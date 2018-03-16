// @flow
import React, { Component } from 'react'
import OrderList from './order_list'
import UserList from './user_list'

const AdminOverview = () => {
  return (
    <div className="flex flex-wrap -mx-6">
      <div className="w-full lg:w-1/2 px-6 pb-4">
        <div className="font-bold text-xl my-2">Unverified Pilots</div>
        <UserList
          cssSizing="w-full lg:w-1/2"
          sortBy="createdAt"
          sizeLimit={10}
          criteria={{ type: 'pilot', isVerified: false }} />
      </div>
      <div className="w-full lg:w-1/2 px-6 pb-4">
        <div className="font-bold text-xl my-2">Orders needing review</div>
        <OrderList
          cssSizing="w-full lg:w-1/2"
          sortBy="uploadedAt"
          sizeLimit={100}
          criteria={{ status: 'awaiting_review' }} />
      </div>
    </div>
  )
}

export default AdminOverview
