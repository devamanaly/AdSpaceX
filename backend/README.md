# AdSpaceX
This is a full stack application for the online ad screen biding

Completed Apis
auth/login
auth/create/admin
auth/create/advertiser
/api/advertiser/profile
/company/register
/company/get

ADMIN - AD SPACES (7 APIs)
├── POST   /api/admin/ad-spaces
├── GET    /api/admin/ad-spaces
├── GET    /api/admin/ad-spaces/[id]


ADMIN - COMPANIES (3 APIs)
├── GET    /api/admin/companies

AUTH (6 APIs)
├── PUT    /api/auth/change-password  (medium)

ADMIN - AD SPACES (7 APIs)

├── PATCH    /api/admin/ad-spaces/[id]
├── DELETE /api/admin/ad-spaces/[id]
├── POST   /api/admin/ad-spaces/[id]/images
└── DELETE /api/admin/ad-spaces/images/[id]

ADMIN - COMPANIES (3 APIs)
├── GET    /api/admin/companies/[id]
└── PUT    /api/admin/companies/[id]/verify

ADVERTISER - COMPANY (3 APIs)
├── POST   /api/advertiser/company
├── GET    /api/advertiser/company
└── PUT    /api/advertiser/company

ADMIN - AUCTIONS (4 APIs)
├── POST   /api/admin/auctions
├── GET    /api/admin/auctions
├── GET    /api/admin/auctions/[id]
└── PUT    /api/admin/auctions/[id]/close

PUBLIC - AUCTIONS (3 APIs)
├── GET    /api/auctions
├── GET    /api/auctions/[id]
└── GET    /api/ad-spaces/[id]/availability

BIDDING (4 APIs)
├── POST   /api/auctions/[id]/bids
├── GET    /api/auctions/[id]/bids
├── GET    /api/advertiser/bids
└── GET    /api/advertiser/bids/won

AD CONTENT (7 APIs)
├── POST   /api/advertiser/ads
├── GET    /api/advertiser/ads
├── GET    /api/advertiser/ads/[id]
├── PUT    /api/advertiser/ads/[id]
├── DELETE /api/advertiser/ads/[id]
├── GET    /api/admin/ads/pending
└── PUT    /api/admin/ads/[id]/review

SCHEDULING (4 APIs)
├── POST   /api/advertiser/schedules
├── GET    /api/advertiser/schedules
├── GET    /api/admin/schedules
└── PUT    /api/schedules/[id]/cancel

NOTIFICATIONS (4 APIs)
├── GET    /api/notifications
├── GET    /api/notifications/unread-count
├── PUT    /api/notifications/[id]/read
└── PUT    /api/notifications/read-all

PAYMENTS (4 APIs)
├── POST   /api/payments/create-checkout
├── POST   /api/webhooks/stripe
├── GET    /api/advertiser/payments
└── GET    /api/admin/payments

DASHBOARD (2 APIs)
├── GET    /api/admin/dashboard
└── GET    /api/advertiser/dashboard
