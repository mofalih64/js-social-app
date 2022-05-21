-- CreateTable
CREATE TABLE "PostViwedByVistour" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "vistor_id" TEXT NOT NULL,

    CONSTRAINT "PostViwedByVistour_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostViwedByVistour" ADD CONSTRAINT "PostViwedByVistour_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
