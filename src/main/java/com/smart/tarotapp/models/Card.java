package com.smart.tarotapp.models;

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
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "cards")
public class Card {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotEmpty
	private String cardType;
	@NotEmpty
	private String nameShort;
	@NotEmpty
	private String name;
	@NotEmpty
	private String value;
	@NotNull
	private Integer valueInt;
	@Lob
	private String meaningUp;
	@Lob
	private String meaningRev;
	@Lob
	private String description;
	@NotEmpty
	private String suit;
	@Column(name = "upright", nullable = false)
	@ColumnDefault("true")
	private boolean upright = true;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
				name = "cards_spreads",
				joinColumns = @JoinColumn(name = "card_id"),
				inverseJoinColumns = @JoinColumn(name = "spread_id")
			)
	private List<Spread> spreadsContainingCard;

	public Card() {
		this.upright = true;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return cardType;
	}

	public void setType(String type) {
		this.cardType = type;
	}

	public String getNameShort() {
		return nameShort;
	}

	public void setNameShort(String nameShort) {
		this.nameShort = nameShort;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public Integer getValueInt() {
		return valueInt;
	}

	public void setValueInt(Integer valueInt) {
		this.valueInt = valueInt;
	}

	public String getMeaningUp() {
		return meaningUp;
	}

	public void setMeaningUp(String meaningUp) {
		this.meaningUp = meaningUp;
	}

	public String getMeaningRev() {
		return meaningRev;
	}

	public void setMeaningRev(String meaningRev) {
		this.meaningRev = meaningRev;
	}

	public String getDesc() {
		return description;
	}

	public void setDesc(String desc) {
		this.description = desc;
	}

	public String getSuit() {
		return suit;
	}

	public void setSuit(String suit) {
		this.suit = suit;
	}

	public String getCardType() {
		return cardType;
	}

	public void setCardType(String cardType) {
		this.cardType = cardType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isUpright() {
		return upright;
	}

	public void setUpright(boolean upright) {
		this.upright = upright;
	}

}
