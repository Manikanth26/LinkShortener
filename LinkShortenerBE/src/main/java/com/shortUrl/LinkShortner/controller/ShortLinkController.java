package com.shortUrl.LinkShortner.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shortUrl.LinkShortner.DTO.ResolveShortLinkResponse;
import com.shortUrl.LinkShortner.DTO.ShortLinkRequest;
import com.shortUrl.LinkShortner.DTO.ShortLinkResponse;
import com.shortUrl.LinkShortner.service.ShortLinkService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "https://linkshortener-mk.netlify.app/")
public class ShortLinkController {

    @Autowired
    private ShortLinkService shortLinkService;

    @PostMapping("/linkShortener")
    public ResponseEntity<ShortLinkResponse> shortenLink(@RequestBody ShortLinkRequest request) {
        String shortLink = shortLinkService.createShortLink(request.getUrl());
        ShortLinkResponse response = new ShortLinkResponse();
        response.setShortLink(shortLink);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/check/{shortLink}")
    public ResponseEntity<ResolveShortLinkResponse> checkShortLink(@PathVariable String shortLink) {
        Optional<String> originalUrl = shortLinkService.getOriginalUrl(shortLink);
        ResolveShortLinkResponse response = new ResolveShortLinkResponse();

        if (originalUrl.isPresent()) {
            response.setSuccess(true);
            response.setOriginalUrl(originalUrl.get());
        } else {
            response.setSuccess(false);
            response.setMessage("Short link not found or expired");
        }

        return ResponseEntity.ok(response);
    }
}
