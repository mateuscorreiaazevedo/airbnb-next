import { formattersHelper } from '@/modules/core'
import { ListingButtonFavorities } from './listing-button-favorities'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  listing: Listing
  authUser: UserInfo | null
}

export const ListingCard: React.FC<Props> = ({ listing, authUser }) => {
  return (
    <div className="relative flex flex-col transition-all items-center w-fit h-fit p-2 rounded-lg hover:bg-neutral-50 justify-center gap-2">
      <Link
        href={`/rooms/${listing.id}`}
        className="flex flex-col items-center justify-center gap-2"
      >
        <Image
          alt={listing.title as string}
          src={listing.imageUrl as string}
          width={300}
          height={300}
          className="rounded-lg aspect-square w-64 object-cover"
        />
        <div className="w-full flex flex-col">
          <div className="inline-flex">
            <h3 className="font-semibold text-sm">{listing.title}</h3>
            <span className="mr-1">, </span>
            <p className="text-sm text-neutral-400">{listing.locationValue}</p>
          </div>
          <p className="font-semibold">
            {formattersHelper.formatMoney(listing.price!)}{' '}
            <span className="font-light">noite</span>
          </p>
        </div>
      </Link>
      <ListingButtonFavorities listingId={listing.id as string} authUser={authUser} />
    </div>
  )
}
