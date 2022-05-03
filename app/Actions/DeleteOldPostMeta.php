<?php

declare(strict_types=1);

namespace WordProofTimestamp\App\Actions;

class DeleteOldPostMeta extends Action
{
    /**
     * Delete the old WordProof post meta.
     *
     * @param array|null $data
     */
    public function execute($data = null): void
    {
        if (isset($data['id']) && \is_int($data['id'])) {
            delete_post_meta($data['id'], 'wordproof_last_timestamped_on');
            delete_post_meta($data['id'], 'wordproof_timestamp_data');
        }
    }
}
