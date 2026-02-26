<?php

namespace App\Traits;

trait Searchable
{
    /**
     * Search across fields including relationships
     */
    public function scopeSearch($query, $searchTerm, $config = null)
    {
        if (empty($searchTerm)) {
            return $query;
        }

        $config = $config ?? $this->getSearchableConfig();

        return $query->where(function ($q) use ($searchTerm, $config) {
            // Search in model fields
            if (isset($config['fields']) && !empty($config['fields'])) {
                foreach ($config['fields'] as $index => $field) {
                    $index === 0 
                        ? $q->where($field, 'like', "%{$searchTerm}%")
                        : $q->orWhere($field, 'like', "%{$searchTerm}%");
                }
            }

            // Search in relationships
            if (isset($config['relationships']) && !empty($config['relationships'])) {
                foreach ($config['relationships'] as $relation => $fields) {
                    $q->orWhereHas($relation, function ($relationQuery) use ($searchTerm, $fields) {
                        $relationQuery->where(function ($rq) use ($searchTerm, $fields) {
                            foreach ($fields as $index => $field) {
                                $index === 0
                                    ? $rq->where($field, 'like', "%{$searchTerm}%")
                                    : $rq->orWhere($field, 'like', "%{$searchTerm}%");
                            }
                        });
                    });
                }
            }

            // Search in nested relationships
            if (isset($config['nested_relationships']) && !empty($config['nested_relationships'])) {
                foreach ($config['nested_relationships'] as $relations => $fields) {
                    $relationParts = explode('.', $relations);
                    $q->orWhereHas($relationParts[0], function ($firstRelation) use ($relationParts, $fields, $searchTerm) {
                        if (count($relationParts) > 1) {
                            $nestedRelation = implode('.', array_slice($relationParts, 1));
                            $firstRelation->whereHas($nestedRelation, function ($nestedQuery) use ($fields, $searchTerm) {
                                $nestedQuery->where(function ($nq) use ($searchTerm, $fields) {
                                    foreach ($fields as $index => $field) {
                                        $index === 0
                                            ? $nq->where($field, 'like', "%{$searchTerm}%")
                                            : $nq->orWhere($field, 'like', "%{$searchTerm}%");
                                    }
                                });
                            });
                        }
                    });
                }
            }
        });
    }

    /**
     * Default searchable fields
     */
    protected function getSearchableConfig()
    {
        return [
            'fields' => ['name'],
            'relationships' => [],
            'nested_relationships' => [],
        ];
    }

    /**
     * Quick search for simple field searches
     */
    public function scopeQuickSearch($query, $searchTerm, array $fields)
    {
        if (empty($searchTerm) || empty($fields)) {
            return $query;
        }

        return $query->where(function ($q) use ($searchTerm, $fields) {
            foreach ($fields as $index => $field) {
                $index === 0
                    ? $q->where($field, 'like', "%{$searchTerm}%")
                    : $q->orWhere($field, 'like', "%{$searchTerm}%");
            }
        });
    }
}
