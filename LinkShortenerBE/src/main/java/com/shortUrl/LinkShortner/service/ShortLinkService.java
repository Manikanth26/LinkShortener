package com.shortUrl.LinkShortner.service;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.shortUrl.LinkShortner.model.ShortLink;
import com.shortUrl.LinkShortner.repository.ShortLinkRepository;

@Service
public class ShortLinkService {
	
	@Autowired
	private ShortLinkRepository repo;
	
	@Value("${app.short-url.base}")
	private String baseUrl;

	public String createShortLink(String url) {
		if(!isValidUrl(url)) {
			throw new IllegalArgumentException("Invalid URL. Please enter a valid URL");
		}
		
		String normalizedUrl = normalizeUrl(url);
		String shortCode = generateShortCode();
		
		ShortLink shortLink = new ShortLink();
		shortLink.setShortLink(shortCode);
		shortLink.setOriginalLink(normalizedUrl);
		shortLink.setCreatedTime(LocalDateTime.now());
		repo.save(shortLink);
		
		return baseUrl + "/" + shortCode;
	}
	
	public Optional<String> getOriginalUrl(String shortId) {
	    return repo.findByShortLink(shortId)
	            .filter(link -> !isExpired(link))
	            .map(ShortLink::getOriginalLink);
	}

	private boolean isExpired(ShortLink link) {
		return link.getCreatedTime().plusMinutes(5).isBefore(LocalDateTime.now());
	}

	public boolean isValidUrl(String url) {
	    try {
	        String link = url.startsWith("http://") || url.startsWith("https://") ? url : "http://" + url;
	        URI uri = new URI(link);
	        return uri.getHost() != null && !uri.getHost().isEmpty();
	    } catch (Exception e) {
	        return false;
	    }
	}
	
	private String generateShortCode() {
		return UUID.randomUUID().toString().substring(0,8);
	}
	
	private String normalizeUrl(String url) {
	    if (!url.startsWith("http://") && !url.startsWith("https://")) {
	        return "https://" + url;
	    }
	    return url;
	}
}
