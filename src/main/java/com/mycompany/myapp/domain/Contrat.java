package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Contrat.
 */
@Entity
@Table(name = "contrat")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Contrat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "type_meg", nullable = false)
    private String typeMEG;

    @NotNull
    @Column(name = "code_offre", nullable = false)
    private String codeOffre;

    @NotNull
    @Column(name = "date_effet", nullable = false)
    private LocalDate dateEffet;

    @JsonIgnoreProperties(value = { "contrat" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private PmEntreprise pmEntreprise;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Contrat id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypeMEG() {
        return this.typeMEG;
    }

    public Contrat typeMEG(String typeMEG) {
        this.setTypeMEG(typeMEG);
        return this;
    }

    public void setTypeMEG(String typeMEG) {
        this.typeMEG = typeMEG;
    }

    public String getCodeOffre() {
        return this.codeOffre;
    }

    public Contrat codeOffre(String codeOffre) {
        this.setCodeOffre(codeOffre);
        return this;
    }

    public void setCodeOffre(String codeOffre) {
        this.codeOffre = codeOffre;
    }

    public LocalDate getDateEffet() {
        return this.dateEffet;
    }

    public Contrat dateEffet(LocalDate dateEffet) {
        this.setDateEffet(dateEffet);
        return this;
    }

    public void setDateEffet(LocalDate dateEffet) {
        this.dateEffet = dateEffet;
    }

    public PmEntreprise getPmEntreprise() {
        return this.pmEntreprise;
    }

    public void setPmEntreprise(PmEntreprise pmEntreprise) {
        this.pmEntreprise = pmEntreprise;
    }

    public Contrat pmEntreprise(PmEntreprise pmEntreprise) {
        this.setPmEntreprise(pmEntreprise);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Contrat)) {
            return false;
        }
        return getId() != null && getId().equals(((Contrat) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Contrat{" +
            "id=" + getId() +
            ", typeMEG='" + getTypeMEG() + "'" +
            ", codeOffre='" + getCodeOffre() + "'" +
            ", dateEffet='" + getDateEffet() + "'" +
            "}";
    }
}
