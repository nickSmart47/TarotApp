package com.smart.tarotapp.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "spreads")
public class Spread {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotEmpty
	private String intention;
	@Min(value= 1, message="Number of Cards must be at least 1")
	private Integer numCards;
	@Lob
	private String notes;
	
	@Column(updatable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date createdAt;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date updatedAt;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
				name = "cards_spreads",
				joinColumns = @JoinColumn(name = "spread_id"),
				inverseJoinColumns = @JoinColumn(name = "card_id")
			)
	private List<Card> cardsInSpread;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="creator_id")
	private User creator;
	
	public Spread() {
		
	}
	
	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}
	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}
	
	
	public Spread(@NotEmpty String intention, @NotEmpty Integer numCards, String notes, List<Card> cardsInSpread) {
		super();
		this.intention = intention;
		this.numCards = numCards;
		this.notes = notes;
		this.cardsInSpread = cardsInSpread;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIntention() {
		return intention;
	}

	public void setIntention(String intention) {
		this.intention = intention;
	}

	public Integer getNumCards() {
		return numCards;
	}

	public void setNumCards(Integer numCards) {
		this.numCards = numCards;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public List<Card> getCardsInSpread() {
		return cardsInSpread;
	}

	public void setCardsInSpread(List<Card> cardsInSpread) {
		this.cardsInSpread = cardsInSpread;
	}

	public User getCreator() {
		return creator;
	}

	public void setCreator(User creator) {
		this.creator = creator;
	}
	
	
	
	
	
}
