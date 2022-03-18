<?php

declare(strict_types=1);

namespace WordProofTimestamp\App\Actions;

use WordProofTimestamp\App\Helpers\ActionHelper;

class MigrateToNewSchema extends Action
{
    private $key = 'wordproof_migrate_to_new_schema';

    public function getKey()
    {
        return $this->key;
    }

    /**
     * @param null $data
     */
    public function execute($data = null): void
    {
        $postsIds = $this->getPosts();

        $i = 60;

        foreach ($postsIds as $id) {
            $timestamp = time() + $i;

            ActionHelper::later($timestamp, 'RetrieveSchemaForPost', ['id' => $id]);
            ActionHelper::later($timestamp, 'DeleteOldPostMeta', ['id' => $id]);

            $i++;
        }

        ActionHelper::later(strtotime('+1 day'), 'DeleteOldOptions');
    }

    /**
     * Get list of posts with old WordProof meta key.
     *
     * @return array
     */
    private function getPosts()
    {
        $arguments = [
            'meta_key' => 'wordproof_last_timestamped_on',
        ];

        $query = new \WP_Query($arguments);
        $posts = $query->get_posts();

        return wp_list_pluck($posts, 'ID');
    }
}
