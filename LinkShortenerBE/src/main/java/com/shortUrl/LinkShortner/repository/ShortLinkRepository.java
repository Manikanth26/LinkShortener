package com.shortUrl.LinkShortner.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.shortUrl.LinkShortner.model.ShortLink;

public interface ShortLinkRepository extends MongoRepository<ShortLink,String> {
	Optional<ShortLink> findByShortLink(String shortLink);
}
