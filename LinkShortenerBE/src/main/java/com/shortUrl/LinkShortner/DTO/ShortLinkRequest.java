package com.shortUrl.LinkShortner.DTO;

import lombok.Data;

@Data
public class ShortLinkRequest {
	private String url;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}
