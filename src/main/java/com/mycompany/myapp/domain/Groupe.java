package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Groupe.
 */
@Entity
@Table(name = "groupe")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Groupe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "code_groupe_assures", nullable = false)
    private String codeGroupeAssures;

    @NotNull
    @Column(name = "code_groupe_population", nullable = false)
    private String codeGroupePopulation;

    @NotNull
    @Column(name = "type_groupe_assures", nullable = false)
    private String typeGroupeAssures;

    @NotNull
    @Column(name = "date_debut_periode_groupe_assures", nullable = false)
    private LocalDate dateDebutPeriodeGroupeAssures;

    @NotNull
    @Column(name = "libelle_groupe_assures_type_autre", nullable = false)
    private String libelleGroupeAssuresTypeAutre;

    @NotNull
    @Column(name = "code_etat_groupe_assures", nullable = false)
    private String codeEtatGroupeAssures;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "pmEntreprise" }, allowSetters = true)
    private Contrat contrat;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Groupe id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeGroupeAssures() {
        return this.codeGroupeAssures;
    }

    public Groupe codeGroupeAssures(String codeGroupeAssures) {
        this.setCodeGroupeAssures(codeGroupeAssures);
        return this;
    }

    public void setCodeGroupeAssures(String codeGroupeAssures) {
        this.codeGroupeAssures = codeGroupeAssures;
    }

    public String getCodeGroupePopulation() {
        return this.codeGroupePopulation;
    }

    public Groupe codeGroupePopulation(String codeGroupePopulation) {
        this.setCodeGroupePopulation(codeGroupePopulation);
        return this;
    }

    public void setCodeGroupePopulation(String codeGroupePopulation) {
        this.codeGroupePopulation = codeGroupePopulation;
    }

    public String getTypeGroupeAssures() {
        return this.typeGroupeAssures;
    }

    public Groupe typeGroupeAssures(String typeGroupeAssures) {
        this.setTypeGroupeAssures(typeGroupeAssures);
        return this;
    }

    public void setTypeGroupeAssures(String typeGroupeAssures) {
        this.typeGroupeAssures = typeGroupeAssures;
    }

    public LocalDate getDateDebutPeriodeGroupeAssures() {
        return this.dateDebutPeriodeGroupeAssures;
    }

    public Groupe dateDebutPeriodeGroupeAssures(LocalDate dateDebutPeriodeGroupeAssures) {
        this.setDateDebutPeriodeGroupeAssures(dateDebutPeriodeGroupeAssures);
        return this;
    }

    public void setDateDebutPeriodeGroupeAssures(LocalDate dateDebutPeriodeGroupeAssures) {
        this.dateDebutPeriodeGroupeAssures = dateDebutPeriodeGroupeAssures;
    }

    public String getLibelleGroupeAssuresTypeAutre() {
        return this.libelleGroupeAssuresTypeAutre;
    }

    public Groupe libelleGroupeAssuresTypeAutre(String libelleGroupeAssuresTypeAutre) {
        this.setLibelleGroupeAssuresTypeAutre(libelleGroupeAssuresTypeAutre);
        return this;
    }

    public void setLibelleGroupeAssuresTypeAutre(String libelleGroupeAssuresTypeAutre) {
        this.libelleGroupeAssuresTypeAutre = libelleGroupeAssuresTypeAutre;
    }

    public String getCodeEtatGroupeAssures() {
        return this.codeEtatGroupeAssures;
    }

    public Groupe codeEtatGroupeAssures(String codeEtatGroupeAssures) {
        this.setCodeEtatGroupeAssures(codeEtatGroupeAssures);
        return this;
    }

    public void setCodeEtatGroupeAssures(String codeEtatGroupeAssures) {
        this.codeEtatGroupeAssures = codeEtatGroupeAssures;
    }

    public Contrat getContrat() {
        return this.contrat;
    }

    public void setContrat(Contrat contrat) {
        this.contrat = contrat;
    }

    public Groupe contrat(Contrat contrat) {
        this.setContrat(contrat);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Groupe)) {
            return false;
        }
        return getId() != null && getId().equals(((Groupe) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Groupe{" +
            "id=" + getId() +
            ", codeGroupeAssures='" + getCodeGroupeAssures() + "'" +
            ", codeGroupePopulation='" + getCodeGroupePopulation() + "'" +
            ", typeGroupeAssures='" + getTypeGroupeAssures() + "'" +
            ", dateDebutPeriodeGroupeAssures='" + getDateDebutPeriodeGroupeAssures() + "'" +
            ", libelleGroupeAssuresTypeAutre='" + getLibelleGroupeAssuresTypeAutre() + "'" +
            ", codeEtatGroupeAssures='" + getCodeEtatGroupeAssures() + "'" +
            "}";
    }
}
