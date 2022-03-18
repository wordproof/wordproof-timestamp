<?php

declare(strict_types=1);

namespace WordProofTimestamp\App\Actions;

use WordProof\SDK\Helpers\OptionsHelper;
use WordProof\SDK\Support\Api;

class RetrieveSchemaForPost extends Action
{
    /**
     * @param array|null $data
     */
    public function execute($data = null): void
    {
        if (!isset($data) || !isset($data['id'])) {
            return;
        }

        $sourceId = OptionsHelper::sourceId();
        $itemId = (int) ($data['id']);

        $endpoint = '/api/sources/' . $sourceId . '/timestamps/dump';
        Api::post($endpoint, ['uid' => $itemId]);
    }
}
